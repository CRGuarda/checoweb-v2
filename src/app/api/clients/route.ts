export const GET = async (request: Request) => {
  return Response.json({ url: request.url })
}
