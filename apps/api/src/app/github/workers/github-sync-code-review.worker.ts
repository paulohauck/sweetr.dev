import {
  PullRequestReviewDismissedEvent,
  PullRequestReviewSubmittedEvent,
} from "@octokit/webhooks-types";
import { Job } from "bullmq";
import { SweetQueue } from "../../../bull-mq/queues";
import { createWorker } from "../../../bull-mq/workers";
import { InputValidationException } from "../../errors/exceptions/input-validation.exception";
import { syncCodeReviews } from "../services/github-code-review.service";

export const syncCodeReviewWorker = createWorker(
  SweetQueue.GITHUB_SYNC_CODE_REVIEW,
  async (
    job: Job<PullRequestReviewSubmittedEvent | PullRequestReviewDismissedEvent>
  ) => {
    if (!job.data.installation?.id) {
      throw new InputValidationException(
        "Received Pull Request webhook without installation",
        { extra: { jobData: job.data }, severity: "error" }
      );
    }

    if (!job.data.pull_request?.node_id) {
      throw new InputValidationException(
        "Received Pull Request webhook without Pull Request",
        { extra: { jobData: job.data }, severity: "error" }
      );
    }

    await syncCodeReviews(
      job.data.installation.id,
      job.data.pull_request.node_id
    );
  }
);
