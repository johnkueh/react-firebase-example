import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "type-graphql";
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

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project])
  async projects(@Ctx() ctx: any) {
    const collectionRef = resource.get();
    const collection = (await collectionRef).docs.map((project: any) => {
      return { id: project.id, ...project.data() };
    });
    return collection;
  }

  @Mutation(() => Project)
  async createProject(
    @Ctx() ctx: any,
    @Arg("input")
    input: CreateProjectInput
  ) {
    const { name, description } = input;
    const { id } = await resource.add({
      name,
      description
    });
    const created = await resource.doc(id).get();

    return {
      id,
      ...created.data()
    };
  }
}

const resource = firebaseAdmin.firestore().collection("projects");
