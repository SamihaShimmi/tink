/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('tink.hybrid.HybridConfig');

const {AeadConfig} = goog.require('google3.third_party.tink.javascript.aead.aead_config');
const EciesAeadHkdfPrivateKeyManager = goog.require('tink.hybrid.EciesAeadHkdfPrivateKeyManager');
const EciesAeadHkdfPublicKeyManager = goog.require('tink.hybrid.EciesAeadHkdfPublicKeyManager');
const HybridDecryptWrapper = goog.require('tink.hybrid.HybridDecryptWrapper');
const HybridEncryptWrapper = goog.require('tink.hybrid.HybridEncryptWrapper');
const Registry = goog.require('google3.third_party.tink.javascript.internal.registry');

// Static methods and constants for registering with the Registry all instances
// of key types for hybrid encryption and decryption supported in a particular
// release of Tink.
//
// To register all key types from the current Tink release one can do:
//
// HybridConfig.register();
//
// For more information on creation and usage of hybrid encryption instances
// see HybridEncryptFactory (for encryption) and HybridDecryptFactory (for
// decryption).

/**
 * Registers key managers for all HybridEncrypt and HybridDecrypt key types
 * from the current Tink release.
 */
const register = function() {
  AeadConfig.register();
  Registry.registerKeyManager(new EciesAeadHkdfPrivateKeyManager());
  Registry.registerKeyManager(new EciesAeadHkdfPublicKeyManager());
  Registry.registerPrimitiveWrapper(new HybridEncryptWrapper());
  Registry.registerPrimitiveWrapper(new HybridDecryptWrapper());
};

/** @const {string} */
const ENCRYPT_PRIMITIVE_NAME = 'HybridEncrypt';
/** @const {string} */
const ECIES_AEAD_HKDF_PUBLIC_KEY_TYPE = EciesAeadHkdfPublicKeyManager.KEY_TYPE;

/** @const {string} */
const DECRYPT_PRIMITIVE_NAME = 'HybridDecrypt';
/** @const {string} */
const ECIES_AEAD_HKDF_PRIVATE_KEY_TYPE =
    EciesAeadHkdfPrivateKeyManager.KEY_TYPE;

exports = {
  register,
  ENCRYPT_PRIMITIVE_NAME,
  ECIES_AEAD_HKDF_PUBLIC_KEY_TYPE,
  DECRYPT_PRIMITIVE_NAME,
  ECIES_AEAD_HKDF_PRIVATE_KEY_TYPE,
};
