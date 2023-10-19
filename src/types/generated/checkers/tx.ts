/* eslint-disable */
import { Long, isSet, DeepPartial, Exact, Rpc } from "../helpers";
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "b9lab.checkers.checkers";
export interface MsgCreateGame {
  creator: string;
  black: string;
  red: string;
  wager: Long;
  denom: string;
}
export interface MsgCreateGameResponse {
  gameIndex: string;
}
export interface MsgPlayMove {
  creator: string;
  gameIndex: string;
  fromX: Long;
  fromY: Long;
  toX: Long;
  toY: Long;
}
export interface MsgPlayMoveResponse {
  capturedX: number;
  capturedY: number;
  winner: string;
}
function createBaseMsgCreateGame(): MsgCreateGame {
  return {
    creator: "",
    black: "",
    red: "",
    wager: Long.UZERO,
    denom: ""
  };
}
export const MsgCreateGame = {
  typeUrl: "/b9lab.checkers.checkers.MsgCreateGame",
  encode(message: MsgCreateGame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.black !== "") {
      writer.uint32(18).string(message.black);
    }
    if (message.red !== "") {
      writer.uint32(26).string(message.red);
    }
    if (!message.wager.isZero()) {
      writer.uint32(32).uint64(message.wager);
    }
    if (message.denom !== "") {
      writer.uint32(42).string(message.denom);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.black = reader.string();
          break;
        case 3:
          message.red = reader.string();
          break;
        case 4:
          message.wager = (reader.uint64() as Long);
          break;
        case 5:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateGame {
    const obj = createBaseMsgCreateGame();
    if (isSet(object.creator)) obj.creator = String(object.creator);
    if (isSet(object.black)) obj.black = String(object.black);
    if (isSet(object.red)) obj.red = String(object.red);
    if (isSet(object.wager)) obj.wager = Long.fromValue(object.wager);
    if (isSet(object.denom)) obj.denom = String(object.denom);
    return obj;
  },
  toJSON(message: MsgCreateGame): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.black !== undefined && (obj.black = message.black);
    message.red !== undefined && (obj.red = message.red);
    message.wager !== undefined && (obj.wager = (message.wager || Long.UZERO).toString());
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGame>, I>>(object: I): MsgCreateGame {
    const message = createBaseMsgCreateGame();
    message.creator = object.creator ?? "";
    message.black = object.black ?? "";
    message.red = object.red ?? "";
    if (object.wager !== undefined && object.wager !== null) {
      message.wager = Long.fromValue(object.wager);
    }
    message.denom = object.denom ?? "";
    return message;
  }
};
function createBaseMsgCreateGameResponse(): MsgCreateGameResponse {
  return {
    gameIndex: ""
  };
}
export const MsgCreateGameResponse = {
  typeUrl: "/b9lab.checkers.checkers.MsgCreateGameResponse",
  encode(message: MsgCreateGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameIndex !== "") {
      writer.uint32(10).string(message.gameIndex);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameIndex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgCreateGameResponse {
    const obj = createBaseMsgCreateGameResponse();
    if (isSet(object.gameIndex)) obj.gameIndex = String(object.gameIndex);
    return obj;
  },
  toJSON(message: MsgCreateGameResponse): unknown {
    const obj: any = {};
    message.gameIndex !== undefined && (obj.gameIndex = message.gameIndex);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGameResponse>, I>>(object: I): MsgCreateGameResponse {
    const message = createBaseMsgCreateGameResponse();
    message.gameIndex = object.gameIndex ?? "";
    return message;
  }
};
function createBaseMsgPlayMove(): MsgPlayMove {
  return {
    creator: "",
    gameIndex: "",
    fromX: Long.UZERO,
    fromY: Long.UZERO,
    toX: Long.UZERO,
    toY: Long.UZERO
  };
}
export const MsgPlayMove = {
  typeUrl: "/b9lab.checkers.checkers.MsgPlayMove",
  encode(message: MsgPlayMove, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.gameIndex !== "") {
      writer.uint32(18).string(message.gameIndex);
    }
    if (!message.fromX.isZero()) {
      writer.uint32(24).uint64(message.fromX);
    }
    if (!message.fromY.isZero()) {
      writer.uint32(32).uint64(message.fromY);
    }
    if (!message.toX.isZero()) {
      writer.uint32(40).uint64(message.toX);
    }
    if (!message.toY.isZero()) {
      writer.uint32(48).uint64(message.toY);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPlayMove {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPlayMove();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.gameIndex = reader.string();
          break;
        case 3:
          message.fromX = (reader.uint64() as Long);
          break;
        case 4:
          message.fromY = (reader.uint64() as Long);
          break;
        case 5:
          message.toX = (reader.uint64() as Long);
          break;
        case 6:
          message.toY = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgPlayMove {
    const obj = createBaseMsgPlayMove();
    if (isSet(object.creator)) obj.creator = String(object.creator);
    if (isSet(object.gameIndex)) obj.gameIndex = String(object.gameIndex);
    if (isSet(object.fromX)) obj.fromX = Long.fromValue(object.fromX);
    if (isSet(object.fromY)) obj.fromY = Long.fromValue(object.fromY);
    if (isSet(object.toX)) obj.toX = Long.fromValue(object.toX);
    if (isSet(object.toY)) obj.toY = Long.fromValue(object.toY);
    return obj;
  },
  toJSON(message: MsgPlayMove): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.gameIndex !== undefined && (obj.gameIndex = message.gameIndex);
    message.fromX !== undefined && (obj.fromX = (message.fromX || Long.UZERO).toString());
    message.fromY !== undefined && (obj.fromY = (message.fromY || Long.UZERO).toString());
    message.toX !== undefined && (obj.toX = (message.toX || Long.UZERO).toString());
    message.toY !== undefined && (obj.toY = (message.toY || Long.UZERO).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgPlayMove>, I>>(object: I): MsgPlayMove {
    const message = createBaseMsgPlayMove();
    message.creator = object.creator ?? "";
    message.gameIndex = object.gameIndex ?? "";
    if (object.fromX !== undefined && object.fromX !== null) {
      message.fromX = Long.fromValue(object.fromX);
    }
    if (object.fromY !== undefined && object.fromY !== null) {
      message.fromY = Long.fromValue(object.fromY);
    }
    if (object.toX !== undefined && object.toX !== null) {
      message.toX = Long.fromValue(object.toX);
    }
    if (object.toY !== undefined && object.toY !== null) {
      message.toY = Long.fromValue(object.toY);
    }
    return message;
  }
};
function createBaseMsgPlayMoveResponse(): MsgPlayMoveResponse {
  return {
    capturedX: 0,
    capturedY: 0,
    winner: ""
  };
}
export const MsgPlayMoveResponse = {
  typeUrl: "/b9lab.checkers.checkers.MsgPlayMoveResponse",
  encode(message: MsgPlayMoveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.capturedX !== 0) {
      writer.uint32(8).int32(message.capturedX);
    }
    if (message.capturedY !== 0) {
      writer.uint32(16).int32(message.capturedY);
    }
    if (message.winner !== "") {
      writer.uint32(26).string(message.winner);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPlayMoveResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPlayMoveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.capturedX = reader.int32();
          break;
        case 2:
          message.capturedY = reader.int32();
          break;
        case 3:
          message.winner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgPlayMoveResponse {
    const obj = createBaseMsgPlayMoveResponse();
    if (isSet(object.capturedX)) obj.capturedX = Number(object.capturedX);
    if (isSet(object.capturedY)) obj.capturedY = Number(object.capturedY);
    if (isSet(object.winner)) obj.winner = String(object.winner);
    return obj;
  },
  toJSON(message: MsgPlayMoveResponse): unknown {
    const obj: any = {};
    message.capturedX !== undefined && (obj.capturedX = Math.round(message.capturedX));
    message.capturedY !== undefined && (obj.capturedY = Math.round(message.capturedY));
    message.winner !== undefined && (obj.winner = message.winner);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgPlayMoveResponse>, I>>(object: I): MsgPlayMoveResponse {
    const message = createBaseMsgPlayMoveResponse();
    message.capturedX = object.capturedX ?? 0;
    message.capturedY = object.capturedY ?? 0;
    message.winner = object.winner ?? "";
    return message;
  }
};
/** Msg defines the Msg service. */
export interface Msg {
  CreateGame(request: MsgCreateGame): Promise<MsgCreateGameResponse>;
  PlayMove(request: MsgPlayMove): Promise<MsgPlayMoveResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateGame = this.CreateGame.bind(this);
    this.PlayMove = this.PlayMove.bind(this);
  }
  CreateGame(request: MsgCreateGame): Promise<MsgCreateGameResponse> {
    const data = MsgCreateGame.encode(request).finish();
    const promise = this.rpc.request("b9lab.checkers.checkers.Msg", "CreateGame", data);
    return promise.then(data => MsgCreateGameResponse.decode(new _m0.Reader(data)));
  }
  PlayMove(request: MsgPlayMove): Promise<MsgPlayMoveResponse> {
    const data = MsgPlayMove.encode(request).finish();
    const promise = this.rpc.request("b9lab.checkers.checkers.Msg", "PlayMove", data);
    return promise.then(data => MsgPlayMoveResponse.decode(new _m0.Reader(data)));
  }
}