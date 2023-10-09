import { registerAs } from '@nestjs/config';

export default registerAs('global', () => {
  const { DEFAULT_POINTS } = process.env;

  return {
    default_points: isNaN(Number(DEFAULT_POINTS)) ? 50 : Number(DEFAULT_POINTS),
  } as const;
});
