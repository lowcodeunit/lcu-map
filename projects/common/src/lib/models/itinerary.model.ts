import { ActivityGroupModel } from './activity-group.model';

export class ItineraryModel {
    public ID?: any; // optional here because it gets created on the back end
    public Title: string;
    public ActivityGroups: Array<ActivityGroupModel>;
    public CreatedDateTime?: Date;
    public Editable?: boolean;
    public Shared?: boolean;
    public SharedByUserID?: any;
    public SharedByUsername?: string;

    constructor(itinerary: ItineraryModel) {
        this.ID = itinerary.ID;
        this.Title = itinerary.Title;
        this.ActivityGroups = itinerary.ActivityGroups;
        this.CreatedDateTime = itinerary.CreatedDateTime;
        this.Editable = itinerary.Editable;
        this.Shared = itinerary.Shared;
        this.SharedByUserID = itinerary.SharedByUserID;
        this.SharedByUsername = itinerary.SharedByUsername;
    }
}