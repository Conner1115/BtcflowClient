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

// type TransactionDetails = {
//   version: string;
//   inputCount: string;
//   InputTransactionHash: string;
//   InputIndex: string;
//   ScriptSig: string;
//   Sequence: string;
//   OutputCount: string;
//   FirstOutput: string;
//   Breakdown: [string, string, string, string, string, string, string, string];
//   breakdownDetails: Array<BreakdownItem>;
// };

export function parseTransaction(transactionHex: string) {
  const chunks: string[] = [];

  for (let i = 0; i < transactionHex.length; i += 2) {
    chunks.push(transactionHex.slice(i, i + 2));
  }

  const version = chunks.slice(0, 4).reverse().join("");
  const inputCount = parseInt(chunks[4], 16);
  const inputs: Array<{
    transactionHash: string;
    index: string;
    scriptLength: string;
    script: string;
    sequence: string;
  }> = [];

  let index = 5;
  for (let i = 0; i < inputCount; i++) {
    const input: {
      transactionHash: string;
      index: string;
      scriptLength: string;
      script: string;
      sequence: string;
    } = {
      transactionHash: chunks
        .slice(index, index + 32)
        .reverse()
        .join(""),
      index: chunks
        .slice(index + 32, index + 36)
        .reverse()
        .join(""),
      scriptLength: chunks.slice(index + 36, index + 38).join(""),
      script: "",
      sequence: chunks
        .slice(index + 38, index + 42)
        .reverse()
        .join(""),
    };
    const scriptLength = parseInt(input.scriptLength, 16) * 2;
    input.script = chunks.slice(index + 38, index + 38 + scriptLength).join("");
    index += 38 + scriptLength + 4;
    inputs.push(input);
  }

  const outputCount = parseInt(
    chunks
      .slice(index, index + 2)
      .reverse()
      .join(""),
    16
  );
  const outputs: Array<{
    value: string;
    scriptLength: string;
    script: string;
  }> = [];

  index += 2;
  for (let i = 0; i < outputCount; i++) {
    const output: {
      value: string;
      scriptLength: string;
      script: string;
    } = {
      value: chunks
        .slice(index, index + 16)
        .reverse()
        .join(""),
      scriptLength: chunks.slice(index + 16, index + 18).join(""),
      script: "",
    };
    const scriptLength = parseInt(output.scriptLength, 16) * 2;
    output.script = chunks
      .slice(index + 18, index + 18 + scriptLength)
      .join("");
    index += 18 + scriptLength;
    outputs.push(output);
  }

  const Breakdown: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ] = [
    version,
    inputCount.toString(),
    inputs.map((input) => input.transactionHash).join(""),
    inputs.map((input) => input.index).join(""),
    inputs.map((input) => input.script).join(""),
    inputs.map((input) => input.sequence).join(""),
    outputCount.toString(),
    outputs.map((output) => output.value).join(""),
  ];

  const breakdownDetails: Array<BreakdownItem> = [
    {
      type: BreakdownChunk.TRS_VERSION,
      value: version,
      index: 0,
    },
    {
      type: BreakdownChunk.TRS_INPUT_COUNT,
      value: inputCount.toString(),
      index: 1,
    },
    ...inputs.flatMap((input, i) => [
      {
        type: BreakdownChunk.TRS_INPUT_TRANSACTION_HASH,
        value: input.transactionHash,
        index: 2 + i * 4,
      },
      {
        type: BreakdownChunk.TRS_INPUT_INDEX,
        value: input.index,
        index: 3 + i * 4,
      },
      {
        type: BreakdownChunk.TRS_SCRIPT_SIG,
        value: input.script,
        index: 4 + i * 4,
      },
      {
        type: BreakdownChunk.TRS_SEQUENCE,
        value: input.sequence,
        index: 5 + i * 4,
      },
    ]),
  ];

  return {
    version,
    inputCount,
    inputs,
    Breakdown,
    breakdownDetails,
  };
}
