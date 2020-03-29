import { Ctx, Field, ID, ObjectType, Query, Resolver } from "type-graphql";
import firebaseAdmin from "../lib/firebase";

@ObjectType()
class Project {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project])
  async projects(@Ctx() ctx: any) {
    const collectionRef = firebaseAdmin
      .firestore()
      .collection("projects")
      .get();
    const collection = (await collectionRef).docs.map((project: any) => {
      return { id: project.id, ...project.data() };
    });
    return collection;
  }
}
