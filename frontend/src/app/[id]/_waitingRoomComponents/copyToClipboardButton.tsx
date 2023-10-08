import { useClipboard, Flex, Input, Button } from "@chakra-ui/react";

type CopyToClipboardButtonProps = {
  text: string;
}

export default function CopyToClipboardButton({text}: CopyToClipboardButtonProps) {
  const { onCopy, value, hasCopied } = useClipboard(text);

  return (
    <>
      <Flex mb={2}>
        <Input
          value={text}
          mr={2}
        />
        <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
      </Flex>
    </>
  )
}

