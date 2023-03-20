import { Center, Button, Heading, VStack } from "native-base";
import type { ImageSourcePropType } from "react-native";
import { ImageBackground } from "react-native";
import type { ReactElement } from "react";
import { useAuth } from "../../context/auth";

export default function SignIn(): ReactElement {
  const { signIn } = useAuth();

  return (
    <ImageBackground
      source={require("../../assets/splash.png") as ImageSourcePropType}
    >
      <Center height="100%">
        <VStack bgColor="white" p="10" borderRadius="2xl" shadow="8">
          <Heading size="2xl" mb="5">
            Going!
          </Heading>
          <Button size="lg" onPress={signIn}>
            Sign In
          </Button>
        </VStack>
      </Center>
    </ImageBackground>
  );
}
