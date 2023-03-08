import { Type } from "@sinclair/typebox";

export const CountrySchema = Type.Object(
  {
    _id: Type.Number(),
    name: Type.String(),
    flag: Type.String(),
    isoCode: Type.String(),
    isVisited: Type.Boolean(),
    isBucketList: Type.Boolean(),
    isGoing: Type.Boolean(),
  },
  {
    $id: "country",
  }
);
export const CountrySchemaRef = Type.Ref(CountrySchema);

export function ErrorResponse(code: number, name: string) {
  return Type.Object(
    {
      statusCode: Type.Literal(code),
      error: Type.String(),
      message: Type.String(),
    },
    {
      $id: name,
    }
  );
}

export const BadRequestSchema = ErrorResponse(400, "badRequest");
export const BadImplementationSchema = ErrorResponse(400, "badImplementation");

export const GetResponseSchema = {
  schema: {
    response: {
      200: CountrySchemaRef,
      400: Type.Ref(BadRequestSchema),
      500: Type.Ref(BadImplementationSchema),
    },
  },
};
