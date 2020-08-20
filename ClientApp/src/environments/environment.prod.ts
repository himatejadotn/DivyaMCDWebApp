import { environmentAPIPaths } from './environmentAPIPaths';

export const environment = {
  production: true,

  baseUrl:'https://zucnrtpwacon002.azurewebsites.net',
  apiGatewayBaseURL: 'https://zucnrtpwacon003.azurewebsites.net',
  apiGatewayAuthorizationBaseURL:'https://app-authorization-dev-001.azurewebsites.net',
  apiGatewayDeploymentBaseURL: 'https://zucnrtpwacon002.azurewebsites.net',

  //apiGatewayRelease:environmentAPIPaths.apiGatewayRelease,
  apiGatewayMarkets: environmentAPIPaths.apiGatewayMarkets,
  //apiGatewayversionUrl:environmentAPIPaths.apiGatewayversionUrl,
  //apiGatewaysoftwareURL:environmentAPIPaths.apiGatewaysoftwareURL,
  apiGatewayReleaseRowUrl:environmentAPIPaths.apiGatewayReleaseRowUrl,
 // apiGatewaytargetUrl :environmentAPIPaths.apiGatewayGetTargetList,
  apiGatewaytargetCount :environmentAPIPaths.apiGatewaytargetCount,
  //apiGatewayreleasestatus:environmentAPIPaths.apiGatewayreleasestatus,
  apiGatewayMultipleDeploymentUrl:environmentAPIPaths.apiGatewayMultipleDeployments,
  apiGatewaySaveDeploymentUrl:environmentAPIPaths.apiGatewaySaveDeployment,
  //apiGatewaydeploynmentdetails: environmentAPIPaths.apiGatewaydeploynmentdetails,
  apiGatewaycanceldeploynment:environmentAPIPaths.apiGatewaycanceldeploynments,
  apiGatewayReleasedelete:environmentAPIPaths.apiGatewayReleasedelete,
  apiGatewayReleaseedit:environmentAPIPaths.apiGatewayReleaseedit,
  apiGatewayReleaseupdate:environmentAPIPaths.apiGatewayReleaseupdate,
};
