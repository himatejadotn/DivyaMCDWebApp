// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { environmentAPIPaths } from './environmentAPIPaths';
export const environment = {
  production: false,
  
  baseUrl:'https://zucnrtpwacon002.azurewebsites.net',
  apiGatewayBaseURL:'https://zucnrtpwacon003.azurewebsites.net',
  apiGatewayAuthorizationBaseURL:'https://app-authorization-dev-001.azurewebsites.net',
  apiGatewayDeploymentBaseURL:'https://zucnrtpwacon002.azurewebsites.net',
 
  //apiGatewayRelease:environmentAPIPaths.apiGatewayRelease,
  //apiGatewaydeploynmentdetails: environmentAPIPaths.apiGatewaydeploynmentdetails,
  apiGatewaycanceldeploynment:environmentAPIPaths.apiGatewaycanceldeploynments,
  apiGatewayMarkets: environmentAPIPaths.apiGatewayMarkets,
  //apiGatewayversionUrl:environmentAPIPaths.apiGatewayversionUrl,
  //apiGatewaysoftwareURL:environmentAPIPaths.apiGatewaysoftwareURL,
  apiGatewayReleaseRowUrl:environmentAPIPaths.apiGatewayReleaseRowUrl,
  //apiGatewaytargetUrl :environmentAPIPaths.apiGatewayGetTargetList,
  apiGatewaytargetCount :environmentAPIPaths.apiGatewaytargetCount,
  //apiGatewayreleasestatus:environmentAPIPaths.apiGatewayreleasestatus,
  apiGatewayMultipleDeploymentUrl:environmentAPIPaths.apiGatewayMultipleDeployments,
  apiGatewaySaveDeploymentUrl:environmentAPIPaths.apiGatewaySaveDeployment,
  apiGatewayReleasedelete:environmentAPIPaths.apiGatewayReleasedelete,
  apiGatewayReleaseedit:environmentAPIPaths.apiGatewayReleaseedit,
  apiGatewayReleaseupdate:environmentAPIPaths.apiGatewayReleaseupdate,

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
