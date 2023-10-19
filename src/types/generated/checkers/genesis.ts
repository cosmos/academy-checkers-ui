/* eslint-disable */
import { Params } from "./params";
import { SystemInfo } from "./system_info";
import { StoredGame } from "./stored_game";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact } from "../helpers";
export const protobufPackage = "b9lab.checkers.checkers";
/** GenesisState defines the checkers module's genesis state. */
export interface GenesisState {
  params: Params;
  systemInfo: SystemInfo;
  storedGameList: StoredGame[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    systemInfo: SystemInfo.fromPartial({}),
    storedGameList: []
  };
}
export const GenesisState = {
  typeUrl: "/b9lab.checkers.checkers.GenesisState",
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.systemInfo !== undefined) {
      SystemInfo.encode(message.systemInfo, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.storedGameList) {
      StoredGame.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.systemInfo = SystemInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.storedGameList.push(StoredGame.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    const obj = createBaseGenesisState();
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    if (isSet(object.systemInfo)) obj.systemInfo = SystemInfo.fromJSON(object.systemInfo);
    if (Array.isArray(object?.storedGameList)) obj.storedGameList = object.storedGameList.map((e: any) => StoredGame.fromJSON(e));
    return obj;
  },
  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.systemInfo !== undefined && (obj.systemInfo = message.systemInfo ? SystemInfo.toJSON(message.systemInfo) : undefined);
    if (message.storedGameList) {
      obj.storedGameList = message.storedGameList.map(e => e ? StoredGame.toJSON(e) : undefined);
    } else {
      obj.storedGameList = [];
    }
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    if (object.systemInfo !== undefined && object.systemInfo !== null) {
      message.systemInfo = SystemInfo.fromPartial(object.systemInfo);
    }
    message.storedGameList = object.storedGameList?.map(e => StoredGame.fromPartial(e)) || [];
    return message;
  }
};