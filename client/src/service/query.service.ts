export default async function query(
  service: (param: any) => Promise<{
    error: boolean;
    message: string | null;
    data: any | null;
    success: boolean;
  }>,
  params: any
) {
  const { error, message, data, success } = await service(params);
  return { error, message, data, success };
}
