import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import * as MyPipeline from '../lib/my-pipeline-stack'

test('Snapshot test', () => {
  const app = new cdk.App()
  const stack = new MyPipeline.MyPipelineStack(app, 'MyPipelineStack', {
    env: {
      account: '111111111111',
      region: 'eu-west-1',
    }
  })

  expect(Template.fromStack(stack)).toMatchSnapshot()
})
