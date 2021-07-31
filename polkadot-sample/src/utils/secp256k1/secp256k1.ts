// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

const elliptic = require('elliptic');
const EC = elliptic.ec;

export const secp256k1 = new elliptic.ec('secp256k1');

export const EXPAND_OPT = { bitLength: 256, isLe: false };
