import type { Context } from '@deepseek-ai/cordis'

declare module '@deepseek-ai/cordis' {
  interface Events {
    'demo/transform'(input: string, next: () => Promise<string>): Promise<string>
  }
}

export const name = 'waterfall-forgot-next'

export function apply(ctx: Context) {
  ctx.on('demo/transform', async (input, next) => {
    console.log('(logger saw)', input)
    // forgot next() — this is a bug
  })
  ctx.on('demo/transform', async (input, next) => {
    const downstream = await next()
    return downstream.toUpperCase()
  })
  void (async () => {
    const result = await ctx.waterfall('demo/transform', 'hello', async () => 'hello')
    console.log('result:', result)
  })()
}
