/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "b9lab.checkers.checkers";

export interface StoredGame {
  index: string;
  board: string;
  turn: string;
  black: string;
  red: string;
  winner: string;
  deadline: string;
  moveCount: Long;
  beforeIndex: string;
  afterIndex: string;
  wager: Long;
  denom: string;
}

function createBaseStoredGame(): StoredGame {
  return {
    index: "",
    board: "",
    turn: "",
    black: "",
    red: "",
    winner: "",
    deadline: "",
    moveCount: Long.UZERO,
    beforeIndex: "",
    afterIndex: "",
    wager: Long.UZERO,
    denom: "",
  };
}

export const StoredGame = {
  encode(
    message: StoredGame,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.board !== "") {
      writer.uint32(18).string(message.board);
    }
    if (message.turn !== "") {
      writer.uint32(26).string(message.turn);
    }
    if (message.black !== "") {
      writer.uint32(34).string(message.black);
    }
    if (message.red !== "") {
      writer.uint32(42).string(message.red);
    }
    if (message.winner !== "") {
      writer.uint32(50).string(message.winner);
    }
    if (message.deadline !== "") {
      writer.uint32(58).string(message.deadline);
    }
    if (!message.moveCount.isZero()) {
      writer.uint32(64).uint64(message.moveCount);
    }
    if (message.beforeIndex !== "") {
      writer.uint32(74).string(message.beforeIndex);
    }
    if (message.afterIndex !== "") {
      writer.uint32(82).string(message.afterIndex);
    }
    if (!message.wager.isZero()) {
      writer.uint32(88).uint64(message.wager);
    }
    if (message.denom !== "") {
      writer.uint32(98).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoredGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoredGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.board = reader.string();
          break;
        case 3:
          message.turn = reader.string();
          break;
        case 4:
          message.black = reader.string();
          break;
        case 5:
          message.red = reader.string();
          break;
        case 6:
          message.winner = reader.string();
          break;
        case 7:
          message.deadline = reader.string();
          break;
        case 8:
          message.moveCount = reader.uint64() as Long;
          break;
        case 9:
          message.beforeIndex = reader.string();
          break;
        case 10:
          message.afterIndex = reader.string();
          break;
        case 11:
          message.wager = reader.uint64() as Long;
          break;
        case 12:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoredGame {
    return {
      index: isSet(object.index) ? String(object.index) : "",
      board: isSet(object.board) ? String(object.board) : "",
      turn: isSet(object.turn) ? String(object.turn) : "",
      black: isSet(object.black) ? String(object.black) : "",
      red: isSet(object.red) ? String(object.red) : "",
      winner: isSet(object.winner) ? String(object.winner) : "",
      deadline: isSet(object.deadline) ? String(object.deadline) : "",
      moveCount: isSet(object.moveCount)
        ? Long.fromValue(object.moveCount)
        : Long.UZERO,
      beforeIndex: isSet(object.beforeIndex) ? String(object.beforeIndex) : "",
      afterIndex: isSet(object.afterIndex) ? String(object.afterIndex) : "",
      wager: isSet(object.wager) ? Long.fromValue(object.wager) : Long.UZERO,
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: StoredGame): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.board !== undefined && (obj.board = message.board);
    message.turn !== undefined && (obj.turn = message.turn);
    message.black !== undefined && (obj.black = message.black);
    message.red !== undefined && (obj.red = message.red);
    message.winner !== undefined && (obj.winner = message.winner);
    message.deadline !== undefined && (obj.deadline = message.deadline);
    message.moveCount !== undefined &&
      (obj.moveCount = (message.moveCount || Long.UZERO).toString());
    message.beforeIndex !== undefined &&
      (obj.beforeIndex = message.beforeIndex);
    message.afterIndex !== undefined && (obj.afterIndex = message.afterIndex);
    message.wager !== undefined &&
      (obj.wager = (message.wager || Long.UZERO).toString());
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoredGame>, I>>(
    object: I
  ): StoredGame {
    const message = createBaseStoredGame();
    message.index = object.index ?? "";
    message.board = object.board ?? "";
    message.turn = object.turn ?? "";
    message.black = object.black ?? "";
    message.red = object.red ?? "";
    message.winner = object.winner ?? "";
    message.deadline = object.deadline ?? "";
    message.moveCount =
      object.moveCount !== undefined && object.moveCount !== null
        ? Long.fromValue(object.moveCount)
        : Long.UZERO;
    message.beforeIndex = object.beforeIndex ?? "";
    message.afterIndex = object.afterIndex ?? "";
    message.wager =
      object.wager !== undefined && object.wager !== null
        ? Long.fromValue(object.wager)
        : Long.UZERO;
    message.denom = object.denom ?? "";
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
