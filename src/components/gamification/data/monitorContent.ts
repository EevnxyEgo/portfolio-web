// Monitor content displayed in The Lab panel based on active skill category

export const monitorContent: Record<string, string[]> = {
  default: [
    'const app = await build();',
    'app.use(react())',
    '// rendering...',
    '// compiling...',
  ],
  'Frontend & Web': [
    'function Component({',
    '  return <div className=',
    '    <Header />',
    '  </div>',
  ],
  'Backend & APIs': [
    'POST /api/projects',
    '{ status: 200 }',
    '{ data: [...] }',
    'cache: HIT',
  ],
  'AI / Machine Learning': [
    'model.fit(X_train)',
    'acc: 94.2%',
    'loss: 0.03',
    'epoch: 47/100',
  ],
  '3D & Creative Tech': [
    'scene.add(mesh)',
    'rotateY(0.5)',
    'geometry: Buffer',
    'render()',
  ],
  'Mobile': [
    'React Native v0.74',
    'state.set({',
    'Bridge.call()',
    'native: true',
  ],
  'Tools & DevOps': [
    'docker build -t .',
    'nginx: running',
    'git push origin',
    'deploy: success',
  ],
}
