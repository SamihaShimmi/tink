/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {PbKeyData, PbMessage} from './proto';

/**
 * An auxiliary container for methods that generate new keys.
 * Those methods are separate from KeyManager as their functionality is
 * independent of the primitive of the corresponding KeyManager.
 *
 */
export interface KeyFactory {
  /**
   * Generates a new random key according to 'keyFormat'.
   *
   * @param keyFormat is either a KeyFormat
   *     proto or a serialized KeyFormat proto
   * @return the new generated key
   */
  newKey(keyFormat: PbMessage|Uint8Array): PbMessage|Promise<PbMessage>;

  /**
   * Generates a new random key based on the "serialized_key_format" and returns
   * it as a KeyData proto.
   *
   */
  newKeyData(serializedKeyFormat: Uint8Array): PbKeyData|Promise<PbKeyData>;
}

export interface PrivateKeyFactory extends KeyFactory {
  /**
   * Returns a public key data extracted from the given serialized private key.
   *
   */
  getPublicKeyData(serializedPrivateKey: Uint8Array): PbKeyData;
}

/**
 * A KeyManager "understands" keys of a specific key type: it can generate keys
 * of the supported type and create primitives for supported keys.
 * A key type is identified by the global name of the protocol buffer that holds
 * the corresponding key material, and is given by typeUrl-field of
 * KeyData-protocol buffer.
 *
 * The template parameter P denotes the primitive corresponding to the keys
 * handled by this manager.
 */
export interface KeyManager<P> {
  /**
   * Constructs an instance of primitive P for a given key.
   *
   * @param key is either a KeyData proto or a supported
   *     key proto
   */
  getPrimitive(primitiveType: AnyDuringMigration, key: PbKeyData|PbMessage):
      Promise<P>;

  /**
   * Returns true if this KeyManager supports keyType.
   *
   */
  doesSupport(keyType: string): boolean;

  /**
   * Returns the URL which identifies the keys managed by this KeyManager.
   *
   */
  getKeyType(): string;

  /**
   * Returns the type of primitive which can be generated by this KeyManager.
   *
   * This function is specific for javascript to allow verifying that
   * the primitive returned by getPrimitive function implements certain
   * primitive interface (e.g. that the primitive is AEAD).
   *
   */
  getPrimitiveType(): AnyDuringMigration;

  /**
   * Returns the version of this KeyManager.
   *
   */
  getVersion(): number;

  /**
   * Returns a factory that generates keys of the key type handled by this
   * manager.
   *
   */
  getKeyFactory(): KeyFactory;
}
