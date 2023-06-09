export enum BreakdownChunk {
  BTC_ADDR_VERSION = "btcAddrVersion",
  BTC_ADDR_HASH = "btcAddrHash",
  BTC_ADDR_CHECKSUM = "btcAddrChecksum",
}

export interface BreakdownItem {
  value: string;
  type: BreakdownChunk;
  index: number;
}

export interface BreakdownInfo {
  tooltip: string;
  description: string;
  encoding: "hex" | "utf-8";
  type: BreakdownChunk;
}

export const breakdownInfo: {
  [key in BreakdownChunk]: BreakdownInfo;
} = {
  [BreakdownChunk.BTC_ADDR_VERSION]: {
    tooltip: "Address Version",
    description: `There are two types of bitcoin addresses: legacy addresses, which begin with the number "1", and segwit addresses, which begin with the number "3" or "bc1".
    
The main difference between legacy and segwit addresses is the way they handle transaction data.

Legacy addresses are the original bitcoin addresses and are still widely used. They are characterized by their starting number "1" and their structure, which includes a version number, a public key hash, and a checksum.

Segwit addresses, on the other hand, were introduced in 2017 as part of a software upgrade called Segregated Witness (SegWit). They have two possible starting numbers: "3" or "bc1". Segwit addresses include a new transaction format that separates the transaction signature data from the rest of the transaction, allowing for more efficient use of block space on the blockchain.

`,
    encoding: "utf-8",
    type: BreakdownChunk.BTC_ADDR_VERSION,
  },
  [BreakdownChunk.BTC_ADDR_HASH]: {
    tooltip: "Address Hash",
    description: `A bitcoin address hash is a 20-byte hash that is derived from the public key of a bitcoin address. It is a unique identifier that allows bitcoins to be sent to and from the address. The process of generating a bitcoin address hash involves applying a hash function, such as SHA-256, to the public key. This produces a fixed-length string of 20 bytes that is typically represented in hexadecimal format.

The bitcoin address hash serves as the core component of a bitcoin address, which also includes a version number and a checksum. When bitcoins are sent to a bitcoin address, the sender uses the address hash to identify the recipient and the amount of bitcoins being sent. The recipient can then use their private key to access and transfer the received bitcoins.

It's worth noting that bitcoin address hashes are unique and cannot be reversed to reveal the original public key. This helps ensure the security and anonymity of bitcoin transactions.`,
    encoding: "utf-8",
    type: BreakdownChunk.BTC_ADDR_HASH,
  },
  [BreakdownChunk.BTC_ADDR_CHECKSUM]: {
    tooltip: "Address Checksum",
    description: `A bitcoin address checksum is a 4-byte code that is appended to a bitcoin address to ensure its validity and prevent errors in transactions. It is generated by applying a checksum algorithm, such as SHA-256 twice, to the version and public key hash components of the bitcoin address.

When a bitcoin transaction is initiated, the recipient's bitcoin address and its checksum are used to verify that the address is valid and has not been tampered with. This helps prevent errors, such as sending bitcoins to an incorrect or non-existent address, and provides an additional layer of security for bitcoin transactions.

It's worth noting that the checksum is not included in the actual address hash and is separate from the public key hash, which is used to identify the recipient of bitcoins.`,
    encoding: "utf-8",
    type: BreakdownChunk.BTC_ADDR_CHECKSUM,
  },
};
