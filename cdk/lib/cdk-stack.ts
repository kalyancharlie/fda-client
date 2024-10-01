import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class MyViteAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'MyViteAppBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true, // Ensure public access for static website
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS, // Allow public access
    });

    // Deploy the built React app to the S3 bucket
    new s3Deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3Deploy.Source.asset('../dist')], // Path to your build output
      destinationBucket: bucket,
    });

    // Output the website URL
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: bucket.bucketWebsiteUrl,
      description: 'The URL of the website',
    });
  }
}
