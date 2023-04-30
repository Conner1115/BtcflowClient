import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export enum ScreenEnum {
  Intro = "intro",
  Prompt = "prompt",
  WalletAddress = "walletAddress",
  OpenAI = "openAI",
  TransactionHash = "transactionHash",
  Unknown = "unknown",
}

export enum InputType {
  Unknown = "UNKNOWN",
  BtcAddress = "BITCOIN_ADDRESS",
  TransactionHash = "TRANSACTION_HASH",
}

export const TabAtom = atom<ScreenEnum>(ScreenEnum.Prompt);
export const UserInput = atom<string>("");
export const UserInputType = atom<InputType>(InputType.Unknown);

export const OpenAIApiKey = atomWithStorage<string | null>(
  "OpenAIApiKey",
  null
);

export const ChatOpen = atom<boolean>(false);
