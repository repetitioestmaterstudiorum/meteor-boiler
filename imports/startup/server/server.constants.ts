import { C as globalC } from '/imports/startup/global.constants';
import _ from 'lodash';

// ---

const serverConstants = {
	...globalC,
};

export const C = _.cloneDeep(serverConstants);
