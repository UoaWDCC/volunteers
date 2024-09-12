export default function DashboardCalendar() {
    return (
    <div className="w-full h-screen ml-12 mr-12">
        <iframe src="https://embed.styledcalendar.com/#5CPwvc6oq2KE7K7VCg5m" title="Styled Calendar" className="styled-calendar-container w-full h-full"  data-cy="calendar-embed-iframe"></iframe>
        <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script>
    </div>
    );
}

