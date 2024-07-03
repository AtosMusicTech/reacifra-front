import PiConfig from 'pyllar/config';
import PiModel from 'pyllar/model';

export default class TransporteModel extends PiModel {
    init(){
        super.init(PiConfig.get('endpoint.transporte'));
    }

    actions(){
        return {
            'get': 'GET:/',
        }
    }
}