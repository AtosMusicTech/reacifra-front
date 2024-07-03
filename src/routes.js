import { register } from "pyllar/env";

const ROUTE_EDIT_CIFRA = {
    NAME: 'editar cifra',
    HASH: '/cifra/edit/:id',
    to(id){
        return this.HASH.replace(':id', id);
    }
};

const ROUTE_NEW_CIFRA = {
    NAME: 'nova cifra',
    HASH: '/cifra/new'
};

const ROUTE_LIST_CIFRA = {
    NAME: 'listar cifras',
    HASH: '/cifras'
};

const ROUTE_PREVIEW_CIFRA = {
    NAME: 'listar cifras',
    HASH: '/cifra/preview',
};

export {
    ROUTE_EDIT_CIFRA,
    ROUTE_NEW_CIFRA,
    ROUTE_LIST_CIFRA,
    ROUTE_PREVIEW_CIFRA
};

register('URL', {
    ROUTE_EDIT_CIFRA,
    ROUTE_NEW_CIFRA,
    ROUTE_LIST_CIFRA,
    ROUTE_PREVIEW_CIFRA
});
