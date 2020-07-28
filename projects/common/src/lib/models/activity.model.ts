export class ActivityModel {
    public ID?: any;
    public Title: string;
    public CreatedDateTime?: Date;
    public LocationID: string;
    public Notes: string;
    public TransportIcon: string;
    public WidgetIcon: string;
    public Favorited: boolean;
    public Checked: boolean;
    public Editable?: boolean;
    public Order?: any;

    constructor(activity: ActivityModel) {
        this.ID = activity.ID;
        this.Title = activity.Title;
        this.CreatedDateTime = activity.CreatedDateTime;
        this.LocationID = activity.LocationID;
        this.Notes = activity.Notes;
        this.TransportIcon = activity.TransportIcon;
        this.WidgetIcon = activity.WidgetIcon;
        this.Favorited = activity.Favorited;
        this.Checked = activity.Checked;
        this.Editable = activity.Editable;
        this.Order = activity.Order;
    }
}