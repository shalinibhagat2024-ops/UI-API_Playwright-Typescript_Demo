import { DataProviderFactory } from "@api/core/data/DataProviderFactory";
import { PostTestData } from "@api/modules/posts/data/PostTestData";
import { PostCreateRequest } from "@api/modules/posts/models/PostCreateRequest";
import { BaseBuilder } from "@api/shared/builders/BaseBuilder";
import { RandomDataUtil } from "@api/shared/utils/RandomDataUtil";

export class PostBuilder extends BaseBuilder<PostCreateRequest> {
  private constructor() {
    super({
      ...PostTestData.defaultPost,

      title: `Post ${RandomDataUtil.postTitle}`,
    });
  }

  static create(): PostBuilder {
    return new PostBuilder();
  }

  withTitle(title: string): PostBuilder {
    this.data.title = title;

    return this;
  }

  withBody(body: string): PostBuilder {
    this.data.body = body;

    return this;
  }

  withUserId(userId: number): PostBuilder {
    this.data.userId = userId;

    return this;
  }

  withTags(tags: string[]): PostBuilder {
    this.data.tags = tags;

    return this;
  }

  withReactions(likes: number, dislikes: number): PostBuilder {
    this.data.reactions = {
      likes,
      dislikes,
    };

    return this;
  }

  public static async fromJson(fileName: string): Promise<PostCreateRequest> {
    return await DataProviderFactory.json<PostCreateRequest>().read(fileName);
  }

  public static fake(): PostCreateRequest {
    return {
      title: `Post ${RandomDataUtil.number()}`,
      body: "Generated from Playwright Framework",
      userId: 1,
      tags: ["playwright", "automation"],
      reactions: {
        likes: 0,
        dislikes: 0,
      },
    };
  }
}
