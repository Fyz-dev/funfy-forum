import { ITopic } from 'src/interface';
import { ITopicService } from '../services/InterfaceServices';
import { TopicService } from '../services/supabase';
import { TopicCreateDTO } from '../dto';

interface ITopicController extends ITopicService {}

class TopicController implements ITopicController {
  private topicService;

  constructor(topicService: ITopicService) {
    this.topicService = topicService;
  }

  async create(topic: TopicCreateDTO): Promise<void> {
    this.topicService.create(topic);
  }

  async getByTitle(name: string): Promise<ITopic[]> {
    return this.topicService.getByTitle(name);
  }

  async getById(id: string): Promise<ITopic> {
    return this.topicService.getById(id);
  }
}

const topicController = new TopicController(new TopicService());

export default topicController;
