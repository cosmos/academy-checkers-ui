/* eslint-disable */
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Params } from "./params";
import { SystemInfo } from "./system_info";
import { StoredGame } from "./stored_game";
import { Long, DeepPartial, Exact, isSet, Rpc } from "../helpers";
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "b9lab.checkers.checkers";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params;
}
export interface QueryGetSystemInfoRequest {}
export interface QueryGetSystemInfoResponse {
  SystemInfo: SystemInfo;
}
export interface QueryGetStoredGameRequest {
  index: string;
}
export interface QueryGetStoredGameResponse {
  storedGame: StoredGame;
}
export interface QueryAllStoredGameRequest {
  pagination?: PageRequest;
}
export interface QueryAllStoredGameResponse {
  storedGame: StoredGame[];
  pagination?: PageResponse;
}
export interface QueryCanPlayMoveRequest {
  gameIndex: string;
  player: string;
  fromX: Long;
  fromY: Long;
  toX: Long;
  toY: Long;
}
export interface QueryCanPlayMoveResponse {
  possible: boolean;
  reason: string;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/b9lab.checkers.checkers.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): QueryParamsRequest {
    const obj = createBaseQueryParamsRequest();
    return obj;
  },
  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/b9lab.checkers.checkers.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryParamsResponse {
    const obj = createBaseQueryParamsResponse();
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    return obj;
  },
  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    return message;
  }
};
function createBaseQueryGetSystemInfoRequest(): QueryGetSystemInfoRequest {
  return {};
}
export const QueryGetSystemInfoRequest = {
  typeUrl: "/b9lab.checkers.checkers.QueryGetSystemInfoRequest",
  encode(_: QueryGetSystemInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSystemInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSystemInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): QueryGetSystemInfoRequest {
    const obj = createBaseQueryGetSystemInfoRequest();
    return obj;
  },
  toJSON(_: QueryGetSystemInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetSystemInfoRequest>, I>>(_: I): QueryGetSystemInfoRequest {
    const message = createBaseQueryGetSystemInfoRequest();
    return message;
  }
};
function createBaseQueryGetSystemInfoResponse(): QueryGetSystemInfoResponse {
  return {
    SystemInfo: SystemInfo.fromPartial({})
  };
}
export const QueryGetSystemInfoResponse = {
  typeUrl: "/b9lab.checkers.checkers.QueryGetSystemInfoResponse",
  encode(message: QueryGetSystemInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SystemInfo !== undefined) {
      SystemInfo.encode(message.SystemInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSystemInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSystemInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.SystemInfo = SystemInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryGetSystemInfoResponse {
    const obj = createBaseQueryGetSystemInfoResponse();
    if (isSet(object.SystemInfo)) obj.SystemInfo = SystemInfo.fromJSON(object.SystemInfo);
    return obj;
  },
  toJSON(message: QueryGetSystemInfoResponse): unknown {
    const obj: any = {};
    message.SystemInfo !== undefined && (obj.SystemInfo = message.SystemInfo ? SystemInfo.toJSON(message.SystemInfo) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetSystemInfoResponse>, I>>(object: I): QueryGetSystemInfoResponse {
    const message = createBaseQueryGetSystemInfoResponse();
    if (object.SystemInfo !== undefined && object.SystemInfo !== null) {
      message.SystemInfo = SystemInfo.fromPartial(object.SystemInfo);
    }
    return message;
  }
};
function createBaseQueryGetStoredGameRequest(): QueryGetStoredGameRequest {
  return {
    index: ""
  };
}
export const QueryGetStoredGameRequest = {
  typeUrl: "/b9lab.checkers.checkers.QueryGetStoredGameRequest",
  encode(message: QueryGetStoredGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetStoredGameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetStoredGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryGetStoredGameRequest {
    const obj = createBaseQueryGetStoredGameRequest();
    if (isSet(object.index)) obj.index = String(object.index);
    return obj;
  },
  toJSON(message: QueryGetStoredGameRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetStoredGameRequest>, I>>(object: I): QueryGetStoredGameRequest {
    const message = createBaseQueryGetStoredGameRequest();
    message.index = object.index ?? "";
    return message;
  }
};
function createBaseQueryGetStoredGameResponse(): QueryGetStoredGameResponse {
  return {
    storedGame: StoredGame.fromPartial({})
  };
}
export const QueryGetStoredGameResponse = {
  typeUrl: "/b9lab.checkers.checkers.QueryGetStoredGameResponse",
  encode(message: QueryGetStoredGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.storedGame !== undefined) {
      StoredGame.encode(message.storedGame, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetStoredGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetStoredGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storedGame = StoredGame.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryGetStoredGameResponse {
    const obj = createBaseQueryGetStoredGameResponse();
    if (isSet(object.storedGame)) obj.storedGame = StoredGame.fromJSON(object.storedGame);
    return obj;
  },
  toJSON(message: QueryGetStoredGameResponse): unknown {
    const obj: any = {};
    message.storedGame !== undefined && (obj.storedGame = message.storedGame ? StoredGame.toJSON(message.storedGame) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetStoredGameResponse>, I>>(object: I): QueryGetStoredGameResponse {
    const message = createBaseQueryGetStoredGameResponse();
    if (object.storedGame !== undefined && object.storedGame !== null) {
      message.storedGame = StoredGame.fromPartial(object.storedGame);
    }
    return message;
  }
};
function createBaseQueryAllStoredGameRequest(): QueryAllStoredGameRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllStoredGameRequest = {
  typeUrl: "/b9lab.checkers.checkers.QueryAllStoredGameRequest",
  encode(message: QueryAllStoredGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllStoredGameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStoredGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAllStoredGameRequest {
    const obj = createBaseQueryAllStoredGameRequest();
    if (isSet(object.pagination)) obj.pagination = PageRequest.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryAllStoredGameRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllStoredGameRequest>, I>>(object: I): QueryAllStoredGameRequest {
    const message = createBaseQueryAllStoredGameRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    }
    return message;
  }
};
function createBaseQueryAllStoredGameResponse(): QueryAllStoredGameResponse {
  return {
    storedGame: [],
    pagination: undefined
  };
}
export const QueryAllStoredGameResponse = {
  typeUrl: "/b9lab.checkers.checkers.QueryAllStoredGameResponse",
  encode(message: QueryAllStoredGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.storedGame) {
      StoredGame.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllStoredGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStoredGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storedGame.push(StoredGame.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAllStoredGameResponse {
    const obj = createBaseQueryAllStoredGameResponse();
    if (Array.isArray(object?.storedGame)) obj.storedGame = object.storedGame.map((e: any) => StoredGame.fromJSON(e));
    if (isSet(object.pagination)) obj.pagination = PageResponse.fromJSON(object.pagination);
    return obj;
  },
  toJSON(message: QueryAllStoredGameResponse): unknown {
    const obj: any = {};
    if (message.storedGame) {
      obj.storedGame = message.storedGame.map(e => e ? StoredGame.toJSON(e) : undefined);
    } else {
      obj.storedGame = [];
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllStoredGameResponse>, I>>(object: I): QueryAllStoredGameResponse {
    const message = createBaseQueryAllStoredGameResponse();
    message.storedGame = object.storedGame?.map(e => StoredGame.fromPartial(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    }
    return message;
  }
};
function createBaseQueryCanPlayMoveRequest(): QueryCanPlayMoveRequest {
  return {
    gameIndex: "",
    player: "",
    fromX: Long.UZERO,
    fromY: Long.UZERO,
    toX: Long.UZERO,
    toY: Long.UZERO
  };
}
export const QueryCanPlayMoveRequest = {
  typeUrl: "/b9lab.checkers.checkers.QueryCanPlayMoveRequest",
  encode(message: QueryCanPlayMoveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameIndex !== "") {
      writer.uint32(10).string(message.gameIndex);
    }
    if (message.player !== "") {
      writer.uint32(18).string(message.player);
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
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCanPlayMoveRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCanPlayMoveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameIndex = reader.string();
          break;
        case 2:
          message.player = reader.string();
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
  fromJSON(object: any): QueryCanPlayMoveRequest {
    const obj = createBaseQueryCanPlayMoveRequest();
    if (isSet(object.gameIndex)) obj.gameIndex = String(object.gameIndex);
    if (isSet(object.player)) obj.player = String(object.player);
    if (isSet(object.fromX)) obj.fromX = Long.fromValue(object.fromX);
    if (isSet(object.fromY)) obj.fromY = Long.fromValue(object.fromY);
    if (isSet(object.toX)) obj.toX = Long.fromValue(object.toX);
    if (isSet(object.toY)) obj.toY = Long.fromValue(object.toY);
    return obj;
  },
  toJSON(message: QueryCanPlayMoveRequest): unknown {
    const obj: any = {};
    message.gameIndex !== undefined && (obj.gameIndex = message.gameIndex);
    message.player !== undefined && (obj.player = message.player);
    message.fromX !== undefined && (obj.fromX = (message.fromX || Long.UZERO).toString());
    message.fromY !== undefined && (obj.fromY = (message.fromY || Long.UZERO).toString());
    message.toX !== undefined && (obj.toX = (message.toX || Long.UZERO).toString());
    message.toY !== undefined && (obj.toY = (message.toY || Long.UZERO).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCanPlayMoveRequest>, I>>(object: I): QueryCanPlayMoveRequest {
    const message = createBaseQueryCanPlayMoveRequest();
    message.gameIndex = object.gameIndex ?? "";
    message.player = object.player ?? "";
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
function createBaseQueryCanPlayMoveResponse(): QueryCanPlayMoveResponse {
  return {
    possible: false,
    reason: ""
  };
}
export const QueryCanPlayMoveResponse = {
  typeUrl: "/b9lab.checkers.checkers.QueryCanPlayMoveResponse",
  encode(message: QueryCanPlayMoveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.possible === true) {
      writer.uint32(8).bool(message.possible);
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCanPlayMoveResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCanPlayMoveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.possible = reader.bool();
          break;
        case 2:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryCanPlayMoveResponse {
    const obj = createBaseQueryCanPlayMoveResponse();
    if (isSet(object.possible)) obj.possible = Boolean(object.possible);
    if (isSet(object.reason)) obj.reason = String(object.reason);
    return obj;
  },
  toJSON(message: QueryCanPlayMoveResponse): unknown {
    const obj: any = {};
    message.possible !== undefined && (obj.possible = message.possible);
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<QueryCanPlayMoveResponse>, I>>(object: I): QueryCanPlayMoveResponse {
    const message = createBaseQueryCanPlayMoveResponse();
    message.possible = object.possible ?? false;
    message.reason = object.reason ?? "";
    return message;
  }
};
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a SystemInfo by index. */
  SystemInfo(request?: QueryGetSystemInfoRequest): Promise<QueryGetSystemInfoResponse>;
  /** Queries a StoredGame by index. */
  StoredGame(request: QueryGetStoredGameRequest): Promise<QueryGetStoredGameResponse>;
  /** Queries a list of StoredGame items. */
  StoredGameAll(request?: QueryAllStoredGameRequest): Promise<QueryAllStoredGameResponse>;
  /** Queries a list of CanPlayMove items. */
  CanPlayMove(request: QueryCanPlayMoveRequest): Promise<QueryCanPlayMoveResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.SystemInfo = this.SystemInfo.bind(this);
    this.StoredGame = this.StoredGame.bind(this);
    this.StoredGameAll = this.StoredGameAll.bind(this);
    this.CanPlayMove = this.CanPlayMove.bind(this);
  }
  Params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("b9lab.checkers.checkers.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new _m0.Reader(data)));
  }
  SystemInfo(request: QueryGetSystemInfoRequest = {}): Promise<QueryGetSystemInfoResponse> {
    const data = QueryGetSystemInfoRequest.encode(request).finish();
    const promise = this.rpc.request("b9lab.checkers.checkers.Query", "SystemInfo", data);
    return promise.then(data => QueryGetSystemInfoResponse.decode(new _m0.Reader(data)));
  }
  StoredGame(request: QueryGetStoredGameRequest): Promise<QueryGetStoredGameResponse> {
    const data = QueryGetStoredGameRequest.encode(request).finish();
    const promise = this.rpc.request("b9lab.checkers.checkers.Query", "StoredGame", data);
    return promise.then(data => QueryGetStoredGameResponse.decode(new _m0.Reader(data)));
  }
  StoredGameAll(request: QueryAllStoredGameRequest = {
    pagination: PageRequest.fromPartial({})
  }): Promise<QueryAllStoredGameResponse> {
    const data = QueryAllStoredGameRequest.encode(request).finish();
    const promise = this.rpc.request("b9lab.checkers.checkers.Query", "StoredGameAll", data);
    return promise.then(data => QueryAllStoredGameResponse.decode(new _m0.Reader(data)));
  }
  CanPlayMove(request: QueryCanPlayMoveRequest): Promise<QueryCanPlayMoveResponse> {
    const data = QueryCanPlayMoveRequest.encode(request).finish();
    const promise = this.rpc.request("b9lab.checkers.checkers.Query", "CanPlayMove", data);
    return promise.then(data => QueryCanPlayMoveResponse.decode(new _m0.Reader(data)));
  }
}