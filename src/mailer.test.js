import { expect }           from 'chai'
import mock                 from 'mock-fs'
import { populateTemplate, buildMessageObject } from './mailer'
import { mailer as constants } from './config/constants'

import path from 'path'

describe('Mailer', () => {

    describe('populateTemplate()', () => {

        afterEach(mock.restore)       

        it('should return populated string', async () => {

            mock({ 'src/templates/test.ejs': '<p><%= variable %></p>' })
         
            const result = await populateTemplate({template: 'test',  data : { variable: 'blah' }})
            
            expect(result).to.equal('<p>blah</p>')
           
        })

        it('should build path with service subfolder if `service` is defined', async () => {

            mock({ 'src/templates/someservice/test.ejs': '<p><%= variable %></p>' })
         
            const result = await populateTemplate({template: 'test', service: 'someservice',  data : { variable: 'blah' }})
            
            expect(result).to.equal('<p>blah</p>')
           
        })

        describe('multilingual', () => {
          
            it('should build path with language subfolder if `multilingual` is true', async () => {
                
                mock({ 'src/templates/en_US/test.ejs': '<p><%= variable %></p>' })

                constants.multilingual = true
            
                const result = await populateTemplate({template: 'test', data : { variable: 'blah' }})
                
                expect(result).to.equal('<p>blah</p>')
            
            })

             it('should build path with specified language if `language` is specified', async () => {
                
                mock({ 'src/templates/cs_CZ/test.ejs': '<p><%= variable %></p>' })
            
                const result = await populateTemplate({
                    template: 'test', 
                    data : { variable: 'blah' },                     
                    language: 'cs_CZ'
                })
                
                expect(result).to.equal('<p>blah</p>')            
            })

        })

    })
    describe('buildMessageObject()', () => {
        let testObject, htmlMessage
        beforeEach(() => {
            testObject = {
                from: 'test name <email@test.com>',
                to: 'server@email.com',
                subject: 'New message from test name',
                html: '<p>blah</p>'
            }
            htmlMessage = '<p>blah</p>'
        }) 
        it('Should set `from` user email and `to` server email if `transactional` is false', () => {            
            const data = {
                name: 'test name',
                email: 'email@test.com'
            }

            constants.server_email = 'server@email.com'

            const messageObject = buildMessageObject({ data }, htmlMessage)

            expect(messageObject).to.eql(testObject) 
        })
        it('Should set `from` server email and `to` user email if `transactional` is true', () => {
            const data = {
                name: 'test name',
                email: 'email@test.com'
            }
            testObject.from = 'server@email.com'
            testObject.to = 'email@test.com'           

            const messageObject = buildMessageObject({ transactional: true, data }, htmlMessage)

            expect(messageObject).to.eql(testObject) 
        })       
    })
})