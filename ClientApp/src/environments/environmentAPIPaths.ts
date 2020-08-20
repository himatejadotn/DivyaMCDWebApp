import { GlobalConstants } from 'src/app/shared/GlobalConstants';

export const environmentAPIPaths = {
  apiGatewayBase:'/api/v1/',
  apiGatewayMonitor:'/api/v1/monitoring/',
  apiGatewayReleaseUrl:'/api/v1/markets/',
  apiGatewayBaseMarketUrl:'/api/v1/markets/',
  apiGatewayReleaseBaseUrl:'/api/v1/releases/',
 // apiGatewayRelease: '/api/v1/markets/'+GlobalConstants.market+'/releases',
  //apiGatewayversionUrl:`/api/v1/releases/`+GlobalConstants.market+`/components/`,
 // apiGatewaysoftwareURL:'/api/v1/releases/'+GlobalConstants.market+'/components',
  apiGatewayReleaseRowUrl:'/api/v1/releases',
  apiGatewaytargetCount :'/api/v1/markets/',
  //apiGatewayreleaseUrl :'/api/v1/markets/'+GlobalConstants.market+'/releases',
  //apiGatewayreleasestatus:'/api/v1/releases/'+GlobalConstants.market+'/releasestatus',
 // apiGatewayTarget: '/api/v1/'+GlobalConstants.market+'/stores',
  //apiGatewayTargetStores: '/api/v1/markets/'+GlobalConstants.market+'/stores',
  apiGatewaySaveTarget: '/api/v1/targets',
  apiGatewayDeleteTarget: '/api/v1/targets/',
  //apiGatewayGetTargetList:'/api/v1/'+GlobalConstants.market+'/targets',
  apiGatewayMarkets: '',
  apiGatewayMultipleDeployments: '/api/v1/deployments/multipledeployments',
  apiGatewaySaveDeployment: '/api/v1/deployments',
  //apiGatewaydeploynmentdetails: '/api/v1/monitoring/WW/deployments/',
  apiGatewayaddStores:'/api/v1/targets/storeId=',
  apiGatewayeditTarget:'/api/v1/targets/',
  apiGatewayReleasedelete:'/api/v1/releases/',
  apiGatewayReleaseedit:'/api/v1/releases/',
  apiGatewayReleaseupdate:'/api/v1/releases/',
  //apiGatewaycanceldeploynments:'/api/v1/deployments/cancel?marketName='+GlobalConstants.market+'&deploymentId='
  apiGatewaycanceldeploynments:'/api/v1/deployments/cancel?marketName='
  };