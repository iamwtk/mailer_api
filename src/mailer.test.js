import { expect }           from 'chai'
import mock                 from 'mock-fs'
import { populateTemplate } from './mailer'

describe('Mailer', () => {

    describe('populateTemplate()', () => {

        afterEach(mock.restore)       

        it('should return populated string', async () => {

            mock({ 'templates/test.ejs': '<p><%= variable %></p>' })
         
            const result = await populateTemplate({template: 'test',  data : { variable: 'blah' }})
            
            expect(result).to.equal('<p>blah</p>')
           
        })

        it('should build path with service subfolder if `service` is defined', async () => {

            mock({ 'templates/someservice/test.ejs': '<p><%= variable %></p>' })
         
            const result = await populateTemplate({template: 'test', service: 'someservice',  data : { variable: 'blah' }})
            
            expect(result).to.equal('<p>blah</p>')
           
        })

        describe('multilingual', () => {
          
            it('should build path with language subfolder if `multilingual` is true', async () => {
                
                mock({ 'templates/en_US/test.ejs': '<p><%= variable %></p>' })
            
                const result = await populateTemplate({template: 'test', data : { variable: 'blah' }, multilingual: true })
                
                expect(result).to.equal('<p>blah</p>')
            
            })

             it('should build path with specified language if `language` is specified', async () => {
                
                mock({ 'templates/cs_CZ/test.ejs': '<p><%= variable %></p>' })
            
                const result = await populateTemplate({
                    template: 'test', 
                    data : { variable: 'blah' }, 
                    multilingual: true,
                    language: 'cs_CZ'
                })
                
                expect(result).to.equal('<p>blah</p>')            
            })

        })

    })
})