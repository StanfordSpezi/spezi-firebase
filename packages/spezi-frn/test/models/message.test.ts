import { expect } from 'chai';
import { Message, MessageType, messageConverter } from '../../src/models/message.js';
import { LocalizedText } from '../../src/models/localizedText.js';

describe('Message Model', () => {
  const now = new Date();
  
  const validMessageData = {
    creationDate: now,
    type: MessageType.Information,
    title: LocalizedText.raw({
      en: 'Test Title',
      de: 'Testtitel'
    }),
    isDismissible: true,
  };
  
  describe('Constructor', () => {
    it('should create a Message instance with required properties', () => {
      const message = new Message(validMessageData);
      
      expect(message).to.be.an.instanceOf(Message);
      expect(message.creationDate).to.equal(validMessageData.creationDate);
      expect(message.type).to.equal(validMessageData.type);
      expect(message.title).to.equal(validMessageData.title);
      expect(message.isDismissible).to.equal(validMessageData.isDismissible);
      expect(message.dueDate).to.be.undefined;
      expect(message.completionDate).to.be.undefined;
      expect(message.description).to.be.undefined;
      expect(message.action).to.be.undefined;
      expect(message.reference).to.be.undefined;
      expect(message.data).to.be.undefined;
    });
    
    it('should create a Message instance with optional properties', () => {
      const dueDate = new Date(now.getTime() + 86400000); // +1 day
      const messageData = {
        ...validMessageData,
        dueDate,
        description: LocalizedText.raw({
          en: 'Test Description',
          de: 'Testbeschreibung'
        }),
        action: 'test-action',
        reference: 'test-ref',
        data: {
          key1: 'value1',
          key2: 'value2'
        }
      };
      
      const message = new Message(messageData);
      
      expect(message).to.be.an.instanceOf(Message);
      expect(message.creationDate).to.equal(messageData.creationDate);
      expect(message.type).to.equal(messageData.type);
      expect(message.title).to.equal(messageData.title);
      expect(message.isDismissible).to.equal(messageData.isDismissible);
      expect(message.dueDate).to.equal(messageData.dueDate);
      expect(message.description).to.equal(messageData.description);
      expect(message.action).to.equal(messageData.action);
      expect(message.reference).to.equal(messageData.reference);
      expect(message.data).to.deep.equal(messageData.data);
    });
  });
  
  describe('Factory Methods', () => {
    it('should create an Information message', () => {
      const message = Message.createInformation({
        title: {
          en: 'Info Title',
          de: 'Info Titel'
        }
      });
      
      expect(message).to.be.an.instanceOf(Message);
      expect(message.type).to.equal(MessageType.Information);
      expect(message.title).to.be.an.instanceOf(LocalizedText);
      expect(message.title.localize('en')).to.equal('Info Title');
      expect(message.isDismissible).to.be.true;
    });
    
    it('should create an Alert message', () => {
      const message = Message.createAlert({
        title: 'Alert Title',
        description: 'Alert Description'
      });
      
      expect(message).to.be.an.instanceOf(Message);
      expect(message.type).to.equal(MessageType.Alert);
      expect(message.title).to.be.an.instanceOf(LocalizedText);
      expect(message.title.localize('en')).to.equal('Alert Title');
      expect(message.description).to.be.an.instanceOf(LocalizedText);
      expect(message.description?.localize('en')).to.equal('Alert Description');
      expect(message.isDismissible).to.be.true;
    });
    
    it('should create a Reminder message', () => {
      const dueDate = new Date();
      const message = Message.createReminder({
        title: 'Reminder Title',
        dueDate,
        isDismissible: false
      });
      
      expect(message).to.be.an.instanceOf(Message);
      expect(message.type).to.equal(MessageType.Reminder);
      expect(message.title.localize('en')).to.equal('Reminder Title');
      expect(message.dueDate).to.equal(dueDate);
      expect(message.isDismissible).to.be.false;
    });
    
    it('should create an Action message', () => {
      const message = Message.createAction({
        title: 'Action Title',
        action: 'app://dosomething'
      });
      
      expect(message).to.be.an.instanceOf(Message);
      expect(message.type).to.equal(MessageType.Action);
      expect(message.title.localize('en')).to.equal('Action Title');
      expect(message.action).to.equal('app://dosomething');
      expect(message.isDismissible).to.be.false;
    });
  });
  
  describe('Message Converter', () => {
    it('should encode a Message instance properly', () => {
      const message = new Message(validMessageData);
      const encoded = messageConverter.encode(message);
      
      expect(encoded).to.be.an('object');
      expect(encoded.type).to.equal(validMessageData.type);
      expect(encoded.isDismissible).to.equal(validMessageData.isDismissible);
      expect(encoded.creationDate).to.have.property('seconds');
      expect(encoded.creationDate).to.have.property('nanoseconds');
    });
    
    it('should handle optional properties during encoding', () => {
      const dueDate = new Date(now.getTime() + 86400000); // +1 day
      const messageData = {
        ...validMessageData,
        dueDate,
        description: LocalizedText.raw('Test Description'),
        action: 'test-action',
      };
      
      const message = new Message(messageData);
      const encoded = messageConverter.encode(message);
      
      expect(encoded).to.be.an('object');
      expect(encoded.dueDate).to.have.property('seconds');
      expect(encoded.dueDate).to.have.property('nanoseconds');
      expect(encoded.description).to.be.an.instanceOf(LocalizedText);
      expect(encoded.action).to.equal(messageData.action);
    });
  });
});