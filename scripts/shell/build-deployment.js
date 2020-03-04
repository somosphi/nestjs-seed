/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const glob = require('glob');
// @ts-ignore
const APP_VERSION = require('../../package.json').version;

/* Envs */
const {
  CI_PROJECT_DIR,
  CI_PROJECT_NAME,
  CI_COMMIT_REF_NAME,
  CI_COMMIT_SHORT_SHA,
  CRONJOB_NAMESPACE,
  PROJECT_NAMESPACE,
  SERVICEPORT,
  ECR,
  ISTIO_VIRTUAL_SERVICE,
  DOCKER_REPO,
} = process.env;

/* Dirs */
const DEPLOYMENT_DIR = path.join(CI_PROJECT_DIR, 'deployment');
const KUBERNETES_DIR = path.join(DEPLOYMENT_DIR, 'kubernetes');
const SCRIPT_DIR = path.join(CI_PROJECT_DIR, 'scripts', 'kubernetes');
fs.mkdirSync(KUBERNETES_DIR);

/* Image */
const DOCKER_IMAGE = [
  ECR,
  '/',
  DOCKER_REPO,
  '/',
  PROJECT_NAMESPACE,
  '-',
  CI_COMMIT_REF_NAME,
  '/',
  CI_PROJECT_NAME,
  ':',
  APP_VERSION,
  '-',
  CI_COMMIT_REF_NAME,
  '-',
  CI_COMMIT_SHORT_SHA,
].join('');

console.info('DOCKER_IMAGE:', DOCKER_IMAGE);

const pattern = path.join(SCRIPT_DIR, '**/*.yaml');
glob(pattern, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const name = path.basename(file);
    const raw = fs.readFileSync(file);

    const yaml = `${raw}`
      .replace(/\$CI_PROJECT_NAME/g, CI_PROJECT_NAME)
      .replace(/\$CI_COMMIT_REF_NAME/g, CI_COMMIT_REF_NAME)
      .replace(/\$CI_COMMIT_SHORT_SHA/g, CI_COMMIT_SHORT_SHA)
      .replace(/\$CRONJOB_NAMESPACE/g, CRONJOB_NAMESPACE)
      .replace(/\$PROJECT_NAMESPACE/g, PROJECT_NAMESPACE)
      .replace(/\$SERVICEPORT/g, SERVICEPORT)
      .replace(/\$ECR/g, ECR)
      .replace(/\$ISTIO_VIRTUAL_SERVICE/g, ISTIO_VIRTUAL_SERVICE)
      .replace(/\$DOCKER_REPO/g, DOCKER_REPO)
      .replace(/\$APP_VERSION/g, APP_VERSION)
      .replace(/\$DOCKER_IMAGE/g, DOCKER_IMAGE);

    fs.writeFileSync(path.join(
      KUBERNETES_DIR,
      name,
    ), yaml);
  }

  process.exit(0);
});
