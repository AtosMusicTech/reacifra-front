import PiConfig from 'pyllar/config';
import PiModel from 'pyllar/model';

export default class QueueModel extends PiModel {
    init(){
        super.init(PiConfig.get('endpoint.queue'));
    }

    actions(){
        return {
            'add': 'POST:/',
            'remove': 'DELETE:/',
            'get': 'GET:/',
        }
    }
}