import { C as globalC } from '/imports/startup/global.constants';
import _ from 'lodash';

// ---

const clientConstants = {
	...globalC,
};

export const C = _.cloneDeep(clientConstants);
