import {
  Box,
  Button,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconMail, IconUser } from "@tabler/icons-react";
import { AvatarUser } from "../../components/avatar-user";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { IconInfo } from "../../components/icon-info";
import { useWorkspace } from "../../providers/workspace.provider";
import { PageContainer } from "../../components/page-container";
import { useAppStore } from "../../providers/app.provider";
import { ResourceNotFound } from "../../exceptions/resource-not-found.exception";

export const SettingsPage = () => {
  const { authenticatedUser: user } = useAppStore();
  const { workspace } = useWorkspace();

  if (!user) {
    throw new ResourceNotFound();
  }

  return (
    <PageContainer>
      <Breadcrumbs items={[{ label: "Settings" }]} />

      <Box maw={600}>
        <Title order={3}>My account</Title>
        <Paper mt="xs" p="lg" withBorder>
          <Text size="sm" fw={500}>
            Avatar
          </Text>
          <AvatarUser
            src={user.avatar}
            name={user.name}
            size={128}
            radius="sm"
          />

          <TextInput
            mt="xs"
            label="Name"
            value={user.name}
            leftSection={<IconUser size={16} stroke={1.5} />}
            disabled
          />
          <TextInput
            mt="xs"
            label="Email"
            value={user.email || ""}
            leftSection={<IconMail size={16} stroke={1.5} />}
            disabled
          />
          <Text color="dimmed" size="xs" mt="md">
            Your profile data is automatically synced with GitHub.
          </Text>
        </Paper>

        <Title order={3} c="red" mt={40}>
          Danger Zone
        </Title>
        <Paper mt="xs" p="md" withBorder>
          <Group justify="space-between" wrap="nowrap">
            <Box>
              <Group gap={4}>
                <Title order={5}>Delete my personal account</Title>
                <IconInfo
                  position="top"
                  tooltip="This will not prevent the app from working on the installed repositories. You can authenticate again anytime."
                />
              </Group>
              <Text c="dimmed" size="sm" display="flex">
                Remove all of your personal information from our servers.{" "}
              </Text>
            </Box>
            <Button
              color="red"
              variant="outline"
              ml="xl"
              component="a"
              href="https://github.com/settings/apps/authorizations"
              target="_blank"
            >
              Revoke OAuth
            </Button>
          </Group>
        </Paper>

        <Paper mt="xs" p="md" withBorder>
          <Group justify="space-between" wrap="nowrap">
            <Box>
              <Title order={5}>Delete workspace</Title>
              <Text c="dimmed" size="sm">
                Uninstall the app from your GitHub organization to remove all
                organization data stored in our servers.
              </Text>
            </Box>
            <Button
              color="red"
              variant="outline"
              ml="xl"
              component="a"
              href={workspace.gitUninstallUrl}
              target="_blank"
            >
              Uninstall App
            </Button>
          </Group>
        </Paper>
      </Box>
    </PageContainer>
  );
};
