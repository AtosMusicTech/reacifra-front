import PiConfig from 'pyllar/config';
import PiModel from 'pyllar/model';

export default class MusicaModel extends PiModel {
    init(){
        super.init(PiConfig.get('endpoint.musica'));
    }

    initWithJson(json){
        super.initWithJson(json);

        return this;
    }

    actions(){
        return {
            'insert': 'POST:/',
            'save': 'PUT:/',
            'get': 'GET:/:id',
            'all': 'GET:/'
        }
    }
}