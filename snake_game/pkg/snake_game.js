import { random } from './snippets/snake_game-027f5cd2d64d2885/www/utils/random.js';

let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}
/**
*/
export const Direction = Object.freeze({ Up:0,"0":"Up",Down:1,"1":"Down",Left:2,"2":"Left",Right:3,"3":"Right", });
/**
*/
export const GameStatus = Object.freeze({ Won:0,"0":"Won",Lost:1,"1":"Lost",Played:2,"2":"Played", });
/**
*/
export class World {

    static __wrap(ptr) {
        const obj = Object.create(World.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_world_free(ptr);
    }
    /**
    * @param {number} width
    * @param {number} snake_spawn_index
    * @returns {World}
    */
    static new(width, snake_spawn_index) {
        const ret = wasm.world_new(width, snake_spawn_index);
        return World.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    width() {
        const ret = wasm.world_width(this.ptr);
        return ret >>> 0;
    }
    /**
    */
    start_game() {
        wasm.world_start_game(this.ptr);
    }
    /**
    * @returns {number}
    */
    points() {
        const ret = wasm.world_points(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number | undefined}
    */
    get_game_status() {
        const ret = wasm.world_get_game_status(this.ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @returns {string}
    */
    game_status_text() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.world_game_status_text(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {number}
    */
    snake_index() {
        const ret = wasm.world_snake_index(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number | undefined}
    */
    reward_cell() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.world_reward_cell(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} direction
    */
    change_snake_direction(direction) {
        wasm.world_change_snake_direction(this.ptr, direction);
    }
    /**
    * @returns {number}
    */
    snake_length() {
        const ret = wasm.world_snake_length(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    snake_cells() {
        const ret = wasm.world_snake_cells(this.ptr);
        return ret;
    }
    /**
    */
    update() {
        wasm.world_update(this.ptr);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_random_524bbd18d6051af2 = function(arg0) {
        const ret = random(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('snake_game_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
