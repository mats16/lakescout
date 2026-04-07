// apps/api/src/models/session.model.test.ts
import { describe, it, expect } from 'vitest';
import { SessionId } from './session.model.js';

/** UUIDv7 形式の正規表現 */
const UUIDV7_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('SessionId', () => {
  describe('constructor', () => {
    it('should generate a new SessionId with UUIDv7', () => {
      const sessionId = new SessionId();

      expect(sessionId.toString()).toMatch(UUIDV7_REGEX);
      expect(sessionId.toUUID()).toMatch(UUIDV7_REGEX);
    });

    it('should generate unique IDs', () => {
      const id1 = new SessionId();
      const id2 = new SessionId();

      expect(id1.toString()).not.toBe(id2.toString());
    });

    it('toString and toUUID should return the same value', () => {
      const sessionId = new SessionId();

      expect(sessionId.toString()).toBe(sessionId.toUUID());
    });
  });

  describe('fromString', () => {
    it('should create SessionId from valid UUIDv7 string', () => {
      const original = new SessionId();
      const str = original.toString();
      const sessionId = SessionId.fromString(str);

      expect(sessionId.toString()).toBe(str);
    });

    it('should throw error for invalid UUID format', () => {
      expect(() => SessionId.fromString('invalid')).toThrow('Invalid session ID format');
    });

    it('should throw error for non-v7 UUID', () => {
      // UUIDv4 format (version 4)
      expect(() => SessionId.fromString('550e8400-e29b-41d4-a716-446655440000')).toThrow(
        'Invalid session ID format'
      );
    });

    it('should throw error for TypeID format', () => {
      expect(() => SessionId.fromString('session_01h455vb4pex5vsknk084sn02q')).toThrow(
        'Invalid session ID format'
      );
    });

    it('should roundtrip correctly', () => {
      const original = new SessionId();
      const str = original.toString();
      const restored = SessionId.fromString(str);

      expect(restored.toString()).toBe(str);
      expect(restored.toUUID()).toBe(original.toUUID());
    });

    it('should return SessionId instance', () => {
      const str = new SessionId().toString();
      const sessionId = SessionId.fromString(str);

      expect(sessionId).toBeInstanceOf(SessionId);
    });
  });

  describe('fromUUID', () => {
    it('should be equivalent to fromString', () => {
      const original = new SessionId();
      const uuid = original.toUUID();

      const fromStr = SessionId.fromString(uuid);
      const fromUUID = SessionId.fromUUID(uuid);

      expect(fromStr.toString()).toBe(fromUUID.toString());
    });

    it('should throw error for invalid UUID', () => {
      expect(() => SessionId.fromUUID('not-a-uuid')).toThrow('Invalid session ID format');
    });
  });

  describe('consistency', () => {
    it('should maintain consistency between representations', () => {
      const original = new SessionId();
      const str = original.toString();
      const uuid = original.toUUID();

      expect(str).toBe(uuid);

      const fromStr = SessionId.fromString(str);
      const fromUUID = SessionId.fromUUID(uuid);

      expect(fromStr.toString()).toBe(str);
      expect(fromUUID.toString()).toBe(str);
    });
  });
});
