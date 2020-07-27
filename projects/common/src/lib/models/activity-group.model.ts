import { ActivityModel } from './activity.model';

export class ActivityGroupModel {
    public ID?: any;
    public Title: string;
    public Activities: Array<ActivityModel>;
    public GroupType: string;
    public Checked: boolean;
    public CreatedDateTime?: Date;
    public Editable?: boolean;
    public Order?: any;

    constructor(activityGroup: ActivityGroupModel) {
        this.ID = activityGroup.ID;
        this.Title = activityGroup.Title;
        this.Activities = activityGroup.Activities;
        this.GroupType = activityGroup.GroupType;
        this.Checked = activityGroup.Checked;
        this.CreatedDateTime = activityGroup.CreatedDateTime;
        this.Editable = activityGroup.Editable;
        this.Order = activityGroup.Order;
    }
}