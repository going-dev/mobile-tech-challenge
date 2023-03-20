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

export const BadRequestSchema = Type.Object(
  {
    statusCode: Type.Literal(400),
    error: Type.String(),
    message: Type.String(),
  },
  {
    $id: "badRequest",
  }
);

export const BadImplementationSchema = Type.Object(
  {
    statusCode: Type.Literal(500),
    error: Type.String(),
    message: Type.String(),
  },
  {
    $id: "badImplementation",
  }
);

export const GetResponseSchema = {
  schema: {
    response: {
      200: CountrySchemaRef,
      400: Type.Ref(BadRequestSchema),
      500: Type.Ref(BadImplementationSchema),
    },
  },
};
