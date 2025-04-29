import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subscription name is required"],
            minLnegth: 2,
            maxLength: 50,
        },

        priceCents: {
            type: Number,
            required: [true, "Subscription price is required"],
            min: [0, "Price should be greater than 0"],
        },

        frequency: {
            type: String,
            enum: ["daily", "weekly", "monthly", "yearly"],
            required: true,
            default: "monthly",
        },

        category: {
            type: String,
            enum: [
                "sports",
                "news",
                "fitness",
                "entertainment",
                "lifestyle",
                "gaming",
                "finance",
                "other",
            ],
            required: true,
        },

        paymentMethod: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            required: true,
            trim: true,
            enum: ["active", "cancelled", "expired"],
            default: "active",
        },

        startDate: {
            type: Date,
            required: true,
            validate: {
                validator: (value) => value <= new Date(),
                message: "Start date must be in the past",
            },
        },

        renewalDate: {
            type: Date,
            required: true,
            validate: {
                validator: (value) => value > this.startDate,
                message: "Renewal date must be after the start date",
            },
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

//Auto calculate the renewal date if missing
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(
            this.renewalDate.getDate() + renewalPeriods[this.frequency]
        );

        // Auto-update the status if renewal date has passed
        if (this.renewalDate < new Date()) {
            this.status = "expired";
        }

        next();
    }
});

const subscriptionModel = mongoose.model("Subscription", subscriptionSchema);

export default subscriptionModel;
