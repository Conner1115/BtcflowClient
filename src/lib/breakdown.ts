import { BreakdownChunk, BreakdownItem } from "./types";

export function breakdownAddress(address: string) {
  const firstChar = address.charAt(0);
  let version,
    hash,
    checksum,
    breakdown,
    breakdownDetails: Array<BreakdownItem>;

  if (firstChar === "1") {
    version = "legacy";
    hash = address.slice(1, -4);
    checksum = address.slice(-4);
    breakdown = [firstChar, hash, checksum];
    breakdownDetails = [
      {
        value: firstChar,
        type: BreakdownChunk.BTC_ADDR_VERSION,
        index: 0,
      },
      {
        value: hash,
        type: BreakdownChunk.BTC_ADDR_HASH,
        index: 1,
      },
      {
        value: checksum,
        type: BreakdownChunk.BTC_ADDR_CHECKSUM,
        index: 2,
      },
    ];
  } else if (firstChar === "3") {
    version = "segwit";
    hash = address.slice(1);
    checksum = "";
    breakdown = [firstChar, hash];
    breakdownDetails = [
      {
        value: firstChar,
        type: BreakdownChunk.BTC_ADDR_VERSION,
        index: 0,
      },
      {
        value: hash,
        type: BreakdownChunk.BTC_ADDR_HASH,
        index: 1,
      },
    ];
  } else if (firstChar === "b") {
    version = "segwit";
    hash = address.slice(3);
    checksum = "";
    breakdown = [address.slice(0, 3), hash];

    breakdownDetails = [
      {
        value: address.slice(0, 3),
        type: BreakdownChunk.BTC_ADDR_VERSION,
        index: 0,
      },
      {
        value: hash,
        type: BreakdownChunk.BTC_ADDR_HASH,
        index: 1,
      },
    ];
  } else {
    throw new Error("Invalid Bitcoin address");
  }

  if (breakdown.join("") !== address) {
    throw new Error("Invalid Bitcoin address");
  }

  return { version, hash, checksum, breakdown, breakdownDetails };
}
