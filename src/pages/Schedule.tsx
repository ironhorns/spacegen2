import {InlineWidget } from "react-calendly";

const Schedule = () => {
    return (
        <div className="p-6">
        <h1 className="text-2xl front-bold text-purple-700 mb-4">Schedule a Call</h1>
        <InlineWidget url="https://calendly.com/trazak" styles={{ height: '700px' }} />
        </div>
    );
};

export default Schedule;