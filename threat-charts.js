// Live Threat Activity Chart
class ThreatChart {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        this.ctx = canvas.getContext('2d');
        this.data = [];
        this.labels = [];
        this.maxDataPoints = 30; // Increased for smoother look
        this.chart = null;

        this.init();

        // Listen for theme changes to update colors
        window.addEventListener('themeChanged', () => this.updateColors());
    }

    init() {
        // Initialize with default data
        for (let i = 0; i < this.maxDataPoints; i++) {
            this.labels.push('');
            this.data.push(Math.floor(Math.random() * 40) + 20);
        }

        const color = this.getThemeColor();

        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'Threat Frequency',
                    data: this.data,
                    borderColor: color,
                    backgroundColor: `${color}15`,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: {
                        display: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 10 } }
                    },
                    y: {
                        display: true,
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 10 } }
                    }
                },
                animation: { duration: 500 }
            }
        });

        // Update periodically with random fluctuations
        setInterval(() => this.updateChart(), 500);
    }

    getThemeColor() {
        const isDark = document.body.classList.contains('dark-theme');
        // Cyan for dark, indigo/blue for light
        return isDark ? '#22d3ee' : '#4f46e5';
    }

    updateColors() {
        if (!this.chart) return;
        const color = this.getThemeColor();
        const isDark = document.body.classList.contains('dark-theme');
        const axisColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        this.chart.data.datasets[0].borderColor = color;
        this.chart.data.datasets[0].backgroundColor = `${color}15`;

        if (this.chart.options.scales) {
            if (this.chart.options.scales.x) {
                this.chart.options.scales.x.ticks.color = axisColor;
                this.chart.options.scales.x.grid.color = gridColor;
            }
            if (this.chart.options.scales.y) {
                this.chart.options.scales.y.ticks.color = axisColor;
                this.chart.options.scales.y.grid.color = gridColor;
            }
        }

        this.chart.update('none');
    }

    updateChart() {
        if (!this.chart) return;
        this.data.shift();
        // Generate a value that is somewhat related to the previous one for a smoother look
        const lastVal = this.data[this.data.length - 1];
        const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
        let newVal = lastVal + change;

        // Keep within bounds
        if (newVal < 10) newVal = 10 + Math.random() * 10;
        if (newVal > 90) newVal = 90 - Math.random() * 10;

        this.data.push(newVal);
        this.chart.update();
    }
}

// Global initialization for known chart IDs
document.addEventListener('DOMContentLoaded', () => {
    const charts = [
        'threat-activity-chart-home',
        'threat-activity-chart-user',
        'threat-activity-chart-admin'
    ];

    charts.forEach(id => {
        if (document.getElementById(id)) {
            new ThreatChart(id);
        }
    });
});

