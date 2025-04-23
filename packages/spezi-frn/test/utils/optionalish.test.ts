import { expect } from 'chai';
import { z } from 'zod';
import { optionalish, optionalishDefault } from '../../src/utils/optionalish.js';

describe('Optionalish Utilities', () => {
  describe('optionalish', () => {
    it('should transform null to undefined', () => {
      const schema = optionalish(z.string());
      
      expect(schema.parse('hello')).to.equal('hello');
      expect(schema.parse(null)).to.be.undefined;
    });
    
    it('should work with different types', () => {
      const numberSchema = optionalish(z.number());
      const booleanSchema = optionalish(z.boolean());
      
      expect(numberSchema.parse(42)).to.equal(42);
      expect(numberSchema.parse(null)).to.be.undefined;
      
      expect(booleanSchema.parse(true)).to.be.true;
      expect(booleanSchema.parse(null)).to.be.undefined;
    });
    
    it('should still validate the inner schema', () => {
      const schema = optionalish(z.string().email());
      
      expect(() => schema.parse('invalid')).to.throw();
      expect(schema.parse('test@example.com')).to.equal('test@example.com');
    });
  });
  
  describe('optionalishDefault', () => {
    it('should provide a default value when null', () => {
      const schema = optionalishDefault(z.string(), 'default value');
      
      expect(schema.parse('hello')).to.equal('hello');
      expect(schema.parse(null)).to.equal('default value');
    });
    
    it('should work with different types and defaults', () => {
      const numberSchema = optionalishDefault(z.number(), 0);
      const booleanSchema = optionalishDefault(z.boolean(), false);
      const arraySchema = optionalishDefault(z.array(z.string()), ['default']);
      
      expect(numberSchema.parse(42)).to.equal(42);
      expect(numberSchema.parse(null)).to.equal(0);
      
      expect(booleanSchema.parse(true)).to.be.true;
      expect(booleanSchema.parse(null)).to.be.false;
      
      expect(arraySchema.parse(['a', 'b'])).to.deep.equal(['a', 'b']);
      expect(arraySchema.parse(null)).to.deep.equal(['default']);
    });
    
    it('should still validate the inner schema', () => {
      const schema = optionalishDefault(z.string().email(), 'default@example.com');
      
      expect(() => schema.parse('invalid')).to.throw();
      expect(schema.parse('test@example.com')).to.equal('test@example.com');
      expect(schema.parse(null)).to.equal('default@example.com');
    });
  });
});