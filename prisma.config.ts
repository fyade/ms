import 'dotenv/config'
import type { PrismaConfig } from 'prisma'

export default {
  earlyAccess: true,
  schema: 'prisma',
} satisfies PrismaConfig
