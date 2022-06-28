import type { Application, Module } from '@sunmao-ui/core';

export type FsManagerOptions = { name: string };
export class FsManager {
  name: string;

  constructor(options: FsManagerOptions) {
    this.name = options.name;
    this.getApp = this.getApp.bind(this);
    this.getModules = this.getModules.bind(this);
    this.saveApp = this.saveApp.bind(this);
    this.saveModules = this.saveModules.bind(this);
  }

  get endpoint() {
    return `/sunmao-fs/${this.name}`;
  }

  async getApp(): Promise<Application> {
    const resp = await (await fetch(this.endpoint)).json();
    if (resp.application.kind === 'Application') {
      return resp.application;
    }
    throw new Error('failed to load schema');
  }

  async getModules(): Promise<Module[]> {
    const resp = await (await fetch(this.endpoint)).json();
    if (Array.isArray(resp.modules)) {
      return resp.modules;
    }
    throw new Error('failed to load schema');
  }

  async saveApp(app: Application) {
    await fetch(this.endpoint, {
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        scope: 'application',
        value: app,
      }),
    });
  }

  async saveModules(modules: Module[]) {
    await fetch(this.endpoint, {
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        scope: 'modules',
        value: modules,
      }),
    });
  }
}
