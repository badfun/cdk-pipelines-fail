import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines'
import { MyPipelineAppStage } from './my-pipeline-app-stage'

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('OWNER/REPO', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    })

    pipeline.addStage(
      new MyPipelineAppStage(this, 'test', {
        env: {
          account: this.node.tryGetContext('account'),
          region: 'eu-west-1',
        },
      })
    )

    pipeline.addStage(
      new MyPipelineAppStage(this, 'prod', {
        env: {
          account: this.node.tryGetContext('account2'),
          region: 'eu-west-1',
        },
      })
    )
  }
}
